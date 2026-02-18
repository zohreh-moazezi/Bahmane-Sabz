// Purpose
// Reusable table to display and manage any entity list.

// Responsibilities

// Render dynamic columns

// Handle edit/delete actions

// Open modal for add/edit

// Pagination controls

// Delete confirmation dialog

// Why it's powerful

// Table structure is defined by columns

// Works for Users, Products, or any future entity

// Architecture Note
// Page controls WHAT fields to show.
// Table controls HOW to display them.
import {
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Avatar,
  Button,
  Flex,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useEntityMutations } from "../hooks/useEntityMutations";
import { BaseEntity } from "../types";
import EntityFormModal from "./EntityFormModal";
import type { FocusableElement } from "@chakra-ui/utils";

interface Props<T extends BaseEntity> {
  entityName: string;
  items: T[];
  total: number;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  columns: { key: keyof T; label: string }[];
}

export default function EntityTable<T extends BaseEntity>({
  entityName,
  items,
  total,
  page,
  setPage,
  limit,
  columns,
}: Props<T>) {
  const totalPage = Math.ceil(total / limit);
  const [itemToDelete, setItemToDelete] = useState<BaseEntity | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const { addMuation, updateMuation, deleteMutation } =
    useEntityMutations(entityName);

  const handleSubmit = async (data: Partial<T>) => {
    console.log("Submitting:", data);
    if (selectedItem) {
      console.log("Updating:", selectedItem.id);
      await updateMuation.mutateAsync({ id: selectedItem.id, data });
    } else {
      console.log("Adding user");
      await addMuation.mutateAsync(data);
    }
    onClose();
  };

  return (
    <>
      <Button
        mb={4}
        onClick={() => {
          setSelectedItem(null);
          onOpen();
        }}
      >
        ADD {entityName.slice(0, -1)}
      </Button>
      <Table variant="simple" bg="white" shadow="md" rounded="lg">
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={String(col.key)}>{col.label}</Th>
            ))}
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              {columns.map((col) => (
                <Td key={String(col.key)}>
                  {col.key === "image" ? (
                    <Avatar size="sm" src={item[col.key] as string} />
                  ) : (
                    String(item[col.key] ?? "")
                  )}
                </Td>
              ))}
              <Td>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => setItemToDelete(item)}
                  isLoading={deleteMutation.isPending}
                >
                  Delete
                </Button>
                <AlertDialog
                  isOpen={!!itemToDelete}
                  leastDestructiveRef={
                    cancelRef as React.RefObject<FocusableElement>
                  }
                  onClose={() => setItemToDelete(null)}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader>Delete Item</AlertDialogHeader>
                      <AlertDialogBody>Are you sure?</AlertDialogBody>
                      <AlertDialogFooter>
                        <Button
                          ref={cancelRef}
                          onClick={() => setItemToDelete(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          colorScheme="red"
                          ml={3}
                          onClick={() => {
                            if (itemToDelete) {
                              deleteMutation.mutate(itemToDelete.id);
                              setItemToDelete(null);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
                <Button
                  size="sm"
                  ml={2}
                  onClick={() => {
                    setSelectedItem(item);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <EntityFormModal
        isOpen={isOpen}
        onClose={onClose}
        initialData={selectedItem}
        onSubmit={handleSubmit}
        fields={columns.map((c) => ({
          name: c.key,
          label: c.label,
        }))}
      />

      <Flex justify="flex-end" mt={4} gap={2}>
        <Button
          size="sm"
          isDisabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          size="sm"
          isDisabled={page === totalPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Flex>
    </>
  );
}

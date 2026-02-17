/**
 * UserTable
 * ----------
 * Displays a table of users with pagination.
 * Supports Add, Edit, Delete operations via UserFormModal and useUserMutations.
 *
 * Props:
 * - users: User[] – array of users to display
 * - total: number – total number of users
 * - page: number – current page number
 * - setPage: function – changes page
 * - limit: number – number of users per page
 */

import { useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
import type { FocusableElement } from "@chakra-ui/utils";
import { useState } from "react";
import UserFormModal from "@/features/users/component/UserFormModal";
import { useUserMutations } from "@/features/users/hooks/useUserMutations";
import { User } from "../types/user.type";

interface Props {
  users: User[];
  total: number;
  page: number;
  setPage: (page: number) => void;
  limit: number;
}

export default function UserTable({
  users,
  total,
  page,
  setPage,
  limit,
}: Props) {
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const totalPage = Math.ceil(total / limit);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { addMutation, updateMutation, deleteMutation } = useUserMutations();

  const handleSubmit = async (data: Partial<User>) => {
    console.log("Submitting:", data);
    if (selectedUser) {
      console.log("Updating:", selectedUser.id);
      await updateMutation.mutateAsync({ id: selectedUser.id, data });
    } else {
      console.log("Adding user");
      await addMutation.mutateAsync(data);
    }
    onClose();
  };
  return (
    <>
      <Button
        mb={4}
        onClick={() => {
          setSelectedUser(null);
          onOpen();
        }}
      >
        Add User
      </Button>

      <Table variant="simple" bg="white" shadow="md" rounded="lg">
        <Thead>
          <Tr>
            <Th>Avatar</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Gender</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>
                <Avatar size="sm" src={user.image} />
              </Td>
              <Td>
                {user.firstName} {user.lastName}
              </Td>
              <Td>{user.email}</Td>
              <Td>{user.gender}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => setUserToDelete(user)}
                  isLoading={deleteMutation.isPending}
                >
                  Delete
                </Button>
                <AlertDialog
                  isOpen={!!userToDelete}
                  leastDestructiveRef={
                    cancelRef as React.RefObject<FocusableElement>
                  }
                  onClose={() => setUserToDelete(null)}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader>Delete User</AlertDialogHeader>

                      <AlertDialogBody>Are you sure?</AlertDialogBody>

                      <AlertDialogFooter>
                        <Button
                          ref={cancelRef}
                          onClick={() => setUserToDelete(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          colorScheme="red"
                          ml={3}
                          onClick={() => {
                            if (userToDelete) {
                              deleteMutation.mutate(userToDelete.id);
                              setUserToDelete(null);
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
                  onClick={() => {
                    setSelectedUser(user);
                    onOpen();
                  }}
                  isLoading={updateMutation.isPending}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <UserFormModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        initialData={selectedUser}
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

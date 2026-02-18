// Purpose
// Generic modal for Add/Edit operations for ANY entity.

// Why generic
// Fields are generated dynamically from the fields prop.

// Key Design Decisions

// Uses React Hook Form for validation

// Works with any entity type using generics

// Resets form when editing existing data

// No hardcoded user/product fields

// SOLID Applied

// SRP → only handles form UI + validation

// Open/Closed → new entities supported without modification

import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  VStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BaseEntity } from "../types";

interface Props<T extends BaseEntity> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<T>) => void;
  initialData?: T | null;
  fields: { name: keyof T; label: string }[];
}
export default function EntityFormModal<T extends BaseEntity>({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  fields,
}: Props<T>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Partial<T>>();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const submitHandler = (data: Partial<T>) => {
    onSubmit(data);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? "Edit" : "Add"} Item</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            {fields.map((field) => (
              <FormControl
                key={String(field.name)}
                isInvalid={!!errors[field.name as keyof T]}
              >
                <FormLabel>{field.label}</FormLabel>
                <Input
                  placeholder={field.label}
                  {...register(field.name as any, {
                    required: `${field.label} is required`,
                  })}
                />
                <FormErrorMessage>
                  {(errors as any)[field.name]?.message as string}
                </FormErrorMessage>
              </FormControl>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit(submitHandler)}
            isLoading={isSubmitting}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

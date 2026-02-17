/**
 * UserFormModal
 * -------------
 * Modal for adding or editing a user.
 * Uses React Hook Form for form management and validation.
 * 
 * Props:
 * - isOpen: boolean – controls modal visibility
 * - onClose: function – closes modal
 * - onSubmit: function – called with user data on save
 * - initialData: User | null – pre-fills form if editing
 */

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User } from "../types/user.type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => void;
  initialData?: User | null;
}

export default function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Partial<User>>();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        firstName: "",
        lastName: "",
        email: "",
      });
    }
  }, [initialData, reset]);

  const submitHandler = (data: Partial<User>) => {
    onSubmit(data);
   
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? "Edit User" : "Add User"}</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="First Name"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="Last Name"
                {...register("lastName", {
                  required: "Last Name is required",
                })}
              />
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
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

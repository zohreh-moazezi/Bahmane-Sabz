/**
 * LoginForm Component
 *
 * Responsibilities:
 * - Render login UI
 * - Handle form state using React Hook Form
 * - Validate inputs using Zod schema
 * - Trigger login mutation via useLogin hook
 *
 * Architecture decisions:
 * - UI separated from business logic (SOLID)
 * - Validation handled externally (DRY)
 * - API logic abstracted in services layer
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading, Box, Input, Button, VStack, Text } from "@chakra-ui/react";
import { LoginFormValues, loginSchema } from "@/features/auth/services/auth.schema";
import { useLogin } from "@/features/auth/hooks/useLogin";

export default function Loginform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, error } = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };
  return (
    <Box
      as="form"
      bg="white"
      p={8}
      rounded="md"
      shadow="md"
      w="sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <VStack spacing={4} align="stretch">
        <Heading size="md" mb={6}>
          Login
        </Heading>
        <Input placeholder="Username" {...register("username")} />
        {errors.username && (
          <Text color="red.500" fontSize="sm">
            {errors.username.message}
          </Text>
        )}
        <Input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <Text color="red.500" fontSize="sm">
            {errors.password.message}
          </Text>
        )}
        <Button
          colorScheme="blue"
          w="full"
          type="submit"
          isLoading={isPending}
          isDisabled={isPending}
        >
          Login
        </Button>
        {error && (
          <Text color="red.500" fontSize="sm">
            {(error as Error).message || "Invalid username or password"}
          </Text>
        )}
      </VStack>
    </Box>
  );
}

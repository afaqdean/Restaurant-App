import { useState } from "react";
import { UseAuthFormProps } from "@/types";

export function useAuthForm<T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
  validate,
}: UseAuthFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Run validation if provided
      if (validate) {
        const validationError = validate(values);
        if (validationError) {
          setError(validationError);
          return;
        }
      }

      await onSubmit(values);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setError("");
    setIsLoading(false);
  };

  return {
    values,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    reset,
    setError,
  };
}

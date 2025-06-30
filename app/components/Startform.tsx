"use client";

import React, { useState, useActionState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { formSchema } from "../lib/Validation";
import { z } from "zod";
import { useToast } from "@/Hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "../lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);
      console.log("Pitch submission result:", result);

      if (result?.status === "SUCCESS" && result._id) {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "Unexpected error",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form
      action={formAction}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <div className="bg-pink-600 text-white text-center py-4 rounded">
        <h1 className="text-2xl font-extrabold">SUBMIT YOUR STARTUP</h1>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block mb-1 font-semibold">
          Title
        </label>
        <input
          id="title"
          name="title"
          placeholder="Startup Title"
          className="w-full border border-black px-4 py-2 rounded-full"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block mb-1 font-semibold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Startup Description"
          className="w-full border border-black px-4 py-2 rounded-xl"
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block mb-1 font-semibold">
          Category
        </label>
        <input
          id="category"
          name="category"
          placeholder="Startup Category (Tech, Health, Education...)"
          className="w-full border border-black px-4 py-2 rounded-full"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>

      {/* Link */}
      <div>
        <label htmlFor="link" className="block mb-1 font-semibold">
          Image URL
        </label>
        <input
          id="link"
          name="link"
          placeholder="Startup Image URL"
          className="w-full border border-black px-4 py-2 rounded-full"
        />
        {errors.link && (
          <p className="text-red-500 text-sm">{errors.link}</p>
        )}
      </div>

      {/* Pitch */}
      <div data-color-mode="light">
        <label htmlFor="pitch" className="block mb-1 font-semibold">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{ disallowedElements: ["style"] }}
        />
        {errors.pitch && (
          <p className="text-red-500 text-sm">{errors.pitch}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full transition disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-5" />
      </button>
    </form>
  );
};

export default StartupForm;

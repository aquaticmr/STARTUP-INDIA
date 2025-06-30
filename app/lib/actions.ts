"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "../lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      _type: "startup",
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session.user.id, // ✅ Correctly reference the current user
      },
      pitch,
    };

    const result = await writeClient.create(startup);

    return parseServerActionResponse({
      _id: result._id, // ✅ Ensure `_id` is returned
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Error creating pitch:", error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

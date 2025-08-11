'use server'

import { revalidateTag } from "next/cache";

export async function revalidateFilesPage() {
  revalidateTag('files'); // Path of the page to refresh
}

export async function revalidatePage() {
  revalidateTag('/Images'); // Path of the page to refresh
}

export async function revalidateShareTag() {
  revalidateTag('Share'); // Path of the page to refresh
}
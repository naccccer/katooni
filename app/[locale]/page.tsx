import { redirect } from "next/navigation";

export default function LocaleHomeRedirect() {
  // The home page is now the OVALA landing at `/`. The previous homepage
  // content (Hero + StorePreview) has been moved to `/about`. Locale-prefixed
  // visits to the bare locale root redirect there.
  redirect("/about");
}

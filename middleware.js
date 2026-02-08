import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let defaultLocale = "en";
let locales = ["bn", "en", "ar"];

// Get the preferred locale, similar to above or using a library
function getLocale(request) {
  try {
    const acceptedLanguage = request.headers.get("accept-language") ?? undefined;

    // If no Accept-Language header, return default locale
    if (!acceptedLanguage) {
      return defaultLocale;
    }

    let headers = { "accept-language": acceptedLanguage };
    let languages = new Negotiator({ headers }).languages();

    // Filter out wildcard (*) and invalid locales
    const validLanguages = languages.filter(lang => lang !== '*' && lang.length >= 2);

    // If no valid languages found, return default
    if (validLanguages.length === 0) {
      return defaultLocale;
    }

    return match(validLanguages, locales, defaultLocale);
  } catch (error) {
    // On any error, fall back to default locale
    console.warn('Locale matching failed, using default:', error.message);
    return defaultLocale;
  }
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    //"/((?!api|assets|.*\\..*|_next).*)",
    "/((?!api|assets|docs|.*\\..*|_next).*)",
    // Optional: only run on root (/) URL
  ],
};

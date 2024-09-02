import KomikChapter from "@/components/komik-detail/KomikChapter";
import KomikDetail from "@/components/komik-detail/KomikDetail";
import KomikSysnopsis from "@/components/komik-detail/KomikSysnopsis";
import KomikChapterLoader from "@/utils/KomikChapterLoader";
import KomikDetailLoader from "@/utils/KomikDetailLoader";
import KomikSysnopsisLoader from "@/utils/KomikSysnopsisLoader";
import React, { Suspense } from "react";

export default function komikPage({
  params,
  children,
}: {
  params: any;
  children?: React.ReactNode;
}) {
  const title = params.title;
  const state = Math.random().toString(36).substring(2, 6);

  return (
    <section className="col-span-full h-max rounded-md md:col-span-2 pt-[62px]">
      <Suspense key={title} fallback={<KomikDetailLoader />}>
        <KomikDetail title={title} />
      </Suspense>
      <Suspense key={state} fallback={<KomikSysnopsisLoader />}>
        <KomikSysnopsis title={title} />
      </Suspense>
      <Suspense key={state + title} fallback={<KomikChapterLoader />}>
        <KomikChapter title={title} />
      </Suspense>
      {children}
    </section>
  );
}

import PageClient from './PageClient';

export function generateStaticParams() {
  return [
    { courseId: 'c1', lessonId: 'l1' },
    { courseId: 'c1', lessonId: 'l2' },
    { courseId: 'c1', lessonId: 'l3' },
    { courseId: 'c2', lessonId: 'l1' },
    { courseId: 'c2', lessonId: 'l2' },
    { courseId: 'c3', lessonId: 'l1' },
    { courseId: 'c3', lessonId: 'l2' },
  ];
}

export default function Page({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  return <PageClient params={params} />;
}

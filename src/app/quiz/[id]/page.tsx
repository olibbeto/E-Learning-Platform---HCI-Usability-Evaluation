import PageClient from './PageClient';

export function generateStaticParams() {
  return [{ id: 'q1' }];
}

export default function Page({ params }: { params: { id: string } }) {
  return <PageClient />;
}

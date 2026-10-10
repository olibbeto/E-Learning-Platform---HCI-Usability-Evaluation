import PageClient from './PageClient';

export function generateStaticParams() {
  return [
    { id: 'a1' },
    { id: 'a2' },
    { id: 'a3' },
  ];
}

export default function Page({ params }: { params: { id: string } }) {
  return <PageClient />;
}

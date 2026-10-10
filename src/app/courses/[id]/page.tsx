import PageClient from './PageClient';

export function generateStaticParams() {
  return [
    { id: 'c1' }, { id: 'c2' }, { id: 'c3' }, { id: 'c4' },
    { id: 'c5' }, { id: 'c6' }, { id: 'c7' }, { id: 'c8' },
  ];
}

export default function Page({ params }: { params: { id: string } }) {
  return <PageClient />;
}

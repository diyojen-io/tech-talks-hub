import BaseButton from "@/app/Components/BaseButton/BaseButton";

export default function Home() {
  return (
    <main>
        <BaseButton label={'Tech Talks Hub'} />
        <BaseButton variant={'secondary'} size={'large'} label={'Tech Talks Hub'} />
        <BaseButton variant={'teritary'} size={'small'} label={'Tech Talks Hub'} />
    </main>
  );
}

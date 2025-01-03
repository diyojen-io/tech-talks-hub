import OrganizationCover from '@/sections/organization/detail/Cover';
import OrganizationInfo from '@/sections/organization/detail/Info';
import { Container, Divider } from '@mui/material';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log('id: ', id);

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <OrganizationCover />
      <Divider
        sx={{
          mb: 4,
        }}
      />
      <OrganizationInfo />
    </Container>
  );
}

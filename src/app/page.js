import TechTalk from "./components/Tech-talk";
import CreateOrganization from "../app/components/CreateOrganization";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <CreateOrganization />
      <TechTalk />;
    </Container>
  );
}

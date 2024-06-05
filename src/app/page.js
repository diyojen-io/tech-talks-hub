import TechTalk from "./components/TechTalk";
import CreateOrganization from "./components/Hero";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <CreateOrganization />
      <TechTalk />;
    </Container>
  );
}

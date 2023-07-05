import React from "react";
import { Container } from "reactstrap";
interface CommonSectionProps {
  title: string|undefined;
}
const CommonSection: React.FC<CommonSectionProps> = ({ title }) => {
  return (
    <section className="common__section">
      <Container>
        <h1>{title}</h1>
      </Container>
    </section>
  );
};

export default CommonSection;

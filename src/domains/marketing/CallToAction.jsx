import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Button } from "../common/Button";
import { Container } from "../common/Container";

export function CallToAction() {
  const { file } = useStaticQuery(graphql`
    query {
      file(name: { eq: "background-call-to-action" }) {
        childImageSharp {
          gatsbyImageData(width: 2347, height: 1244, layout: FIXED)
        }
      }
    }
  `);
  const backgroundImage = getImage(file.childImageSharp);

  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <GatsbyImage
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        image={backgroundImage}
        alt=""
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            It’s time to take control of your books. Buy our software so you can
            feel like you’re doing something productive.
          </p>
          <Button href="/register" color="white" className="mt-10">
            Get 6 months free
          </Button>
        </div>
      </Container>
    </section>
  );
}

import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export const query = graphql`
  query($nodeId: String!) {
    mdx(id: { eq: $nodeId }) {
      id
      body
      frontmatter {
        title
      }
      fields {
        path
      }
    }
  }
`;

const Doc = ({ data, pageContext }) => {
  const { frontmatter, fields, body } = data.mdx;

  return (<div>
    <h1>{frontmatter.title}</h1>
    <MDXRenderer>{body}</MDXRenderer>
  </div>);
};

export default Doc;

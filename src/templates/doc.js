import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
  query($nodeId: String!) {
    markdownRemark(id: { eq: $nodeId }) {
      id
      html
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
  const { frontmatter, fields, html } = data.markdownRemark;

  return (<div>
    <h1>{frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: html }}/ >
  </div>);
};

export default Doc;

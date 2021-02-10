/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// for i in {1..500}; do cp template.mdx "$i.mdx"; done

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type !== 'MarkdownRemark') return;

  const path = createFilePath({ node, getNode });
  createNodeField({ node, name: 'path', value: path });
};

exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          id
          frontmatter {
            title
          }
          fields {
            path
          }
        }
      }
    }
  `);

  const { nodes } = result.data.allMarkdownRemark;

  nodes.forEach(node => {
    actions.createPage({
      path: node.fields.path,
      component: require.resolve('./src/templates/doc'),
      context: {
        nodeId: node.id,
      },
    });
  });
};


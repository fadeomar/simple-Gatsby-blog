import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

const ContentfulBlog = ({ data, pageContext, location }) => {
  const post = data.contentfulGatsbyTest
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  console.log(post.childContentfulGatsbyTestContentRichTextNode.json.content)
  const Remark = documentToReactComponents(
    {
      nodeType: "document",
      content: post.childContentfulGatsbyTestContentRichTextNode.json.content,
    },
    options
  )
  console.log(Remark, "remark")
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.title} description={post.subtitle || post.excerpt} />
      <article>
        <header>
          <Img fluid={post.image.fluid} />
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.title}
          </h1>
        </header>
        <section>{Remark}</section>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ←← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →→
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default ContentfulBlog

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    contentfulGatsbyTest(slug: { eq: $slug }) {
      childContentfulGatsbyTestContentRichTextNode {
        json
      }
    }
    contentfulGatsbyTest(slug: { eq: $slug }) {
      title
      author
      subtitle
      content {
        content
      }
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

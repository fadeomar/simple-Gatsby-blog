import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Post = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const PostImage = styled.div`
  flex: 25%;
  margin-right: 1rem;
`

const PostText = styled.div`
  flex: 75%;
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulGatsbyTest.edges
  console.log(posts)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const comes = JSON.parse(node.content.content)
        const {
          content: [
            {
              content: [{ value }],
            },
          ],
        } = comes
        console.log(value, "this is my value")
        const title = node.title || node.slug
        return (
          <Post key={node.slug}>
            <PostImage>
              <Img fluid={node.image.fluid} />
            </PostImage>
            <PostText>
              <header>
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.slug}>
                    {title}
                  </Link>
                </h3>
              </header>
              <section>
                {console.log(
                  JSON.parse(node.content.content).content[0].content[0],
                  "subtitle"
                )}
                <p>{node.subtitle}</p>
              </section>
            </PostText>
          </Post>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulGatsbyTest {
      edges {
        node {
          title
          slug
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
    }
  }
`

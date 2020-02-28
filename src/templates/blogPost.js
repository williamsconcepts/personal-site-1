import React from 'react';
import Layout from './layout';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Moment from 'react-moment';
import BlogAuthor from '../components/blog/BlogAuthor';
import BlogPostPageWrapper from '../styles/blog/BlogPostStyles';
import JDCLogo from '../images/svg/SignatureLogoSVG';

// TODO add next and previous post links

const blogPost = ({ path, data }) => {
  const {
    title,
    subtitle,
    slug,
    type,
    imageTitle,
    imageAlt,
    date,
    tags,
  } = data.markdownRemark.frontmatter;
  console.log(data);

  const seo = {
    page: `${type}`,
    title: `${title}`,
    description: `${data.markdownRemark.excerpt}`,
    url: `https://jacobdcastro.com/${slug}`,
    imgUrl: `${data.file.publicURL}`,
    imgAlt: `${data.file.imageAlt}`,
    breadcrumbs: [
      {
        name: 'Blog',
        path: '/blog',
      },
      {
        name: `${title}`,
        path: `/blog/${slug}`,
      },
    ],
  };

  return (
    <Layout seo={seo} path={path} style={{ textAlign: 'left' }}>
      <BlogPostPageWrapper>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <ul>
          {tags &&
            tags.map((tag, i) => (
              <li className="listingTag" key={i}>
                <h5>{tag}</h5>
              </li>
            ))}
        </ul>
        <span className="published">
          Published: <Moment date={date} format="MMM DD, YYYY" />
        </span>

        {data.markdownRemark.timeToRead &&
          (type === 'tutorial' ? (
            <span>
              Approx. {data.markdownRemark.timeToRead + 5} minutes to complete
            </span>
          ) : (
            <span>{data.markdownRemark.timeToRead} minute read</span>
          ))}

        <BlogAuthor />

        <Img
          style={{
            marginBottom: '25px',
          }}
          fluid={data.file.childImageSharp.fluid}
          alt={imageAlt}
          title={imageTitle}
        />

        <article
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />

        <div className="closing">
          <JDCLogo />
          <h3>- Jacob D. Castro</h3>
        </div>
      </BlogPostPageWrapper>
    </Layout>
  );
};

blogPost.propTypes = {
  path: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default blogPost;

export const BLOG_POST_QUERY = graphql`
  query BLOG_POST_QUERY($slug: String!, $imgUrl: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 370)
      timeToRead
      frontmatter {
        type
        title
        slug
        subtitle
        image
        imageTitle
        imageAlt
        date
        tags
      }
    }

    file(relativePath: { eq: $imgUrl }) {
      publicURL # used for SEO
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import BackgroundImage from 'gatsby-background-image'
// Use the following to support legacy browsers like IE11:
// import BackgroundImage from 'gatsby-background-image-es5'
import { generateMedia } from 'styled-media-query'
import { StyledFullScreenWrapper } from './SharedStyledComponents'

const media = generateMedia()

/**
 * In this functional component a <BackgroundImage />  is compared to an <Img />.
 * @param className   string    className(s) from styled-components.
 * @param children    nodes     Child-components from index.js
 * @return {*}
 * @constructor
 */
const BackgroundSection = ({ className, children }) => {
  const { desktop } = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "seamless-bg-desktop.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `
  )

  const imageData = desktop.childImageSharp.fluid
  return (
    // The container height is the full viewport height
    <section style={{ width: '100%', height: '100vh' }}>
        <BackgroundImage
          Tag="div"
          className={className}
          // To style via external CSS see layout.css last examples:
          // className="test"
          fluid={imageData}
          backgroundColor={`#040e18`}
          // Title get's passed to both container and noscriptImg.
          title="gbitest"
          // style={{
          //   // Defaults are overwrite-able by setting one of the following:
          //   // backgroundSize: '',
          //   // backgroundPosition: '',
          //   // backgroundRepeat: '',
          // }}
          // To "force" the classic fading in of every image (especially on
          // imageData change for fluid / fixed) by setting `soft` on `fadeIn`:
          // fadeIn={`soft`}
          // To be able to use stacking context changing elements yourself,
          // set this to true to disable the "opacity hack":
          // preserveStackingContext={true}
          // You can "safely" (look them up beforehand ; ) add other props:
          id="gbitest"
          role="img"
          aria-label="gbitest"
        >
          {children}
        </BackgroundImage>
    </section>
  )
}

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100vw;
  // TO REPRODUCE:
  // Comment / Uncomment the following line and save the file while hot reloading
  height: 100%; // Loads as 100% of its container height
`

export default StyledBackgroundSection

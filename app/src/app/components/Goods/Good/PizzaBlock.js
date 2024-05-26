import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={1}
    width={340}
    height={400}
    viewBox="0 0 340 400"
    backgroundColor="#8f8f8f"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* <circle cx="623" cy="244" r="20" /> 
    <rect x="483" y="233" rx="0" ry="0" width="31" height="20" /> 
    <circle cx="592" cy="235" r="48" />  */}
    <rect x="4" y="0" rx="0" ry="0" width="340" height="240" /> 
    <rect x="4" y="250" rx="0" ry="0" width="340" height="140" style={{ marginBottom: 0 }}  />
  </ContentLoader>
)

export default MyLoader

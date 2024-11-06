const { Box } = require("@mui/material");
const { styled } = require("@mui/system");


//use styled component to create a flex container (Box) with space-between alignment
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
// SvgIcon.js
const SvgIcon = ({ width, height, fill, transform }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "15"}
      height={height || "121"}
      viewBox="0 0 15 121"
      fill={fill || "none"}
      style={{ transform }}
    >
      <path
        d="M11.4061 46.7539C16.4911 54.1139 16.0702 63.9554 10.3754 70.8543L-24.7249 113.376C-25.2378 113.998 -25.6612 114.688 -25.9826 115.427C-30.0436 124.76 -44.0864 120.598 -42.406 110.559L-39.4989 93.1924L-35.9989 20.6923L-35.2939 10.344C-34.5737 -0.22929 -20.1671 -2.76035 -15.8861 6.93427C-15.628 7.51877 -15.3152 8.0776 -14.952 8.60329L11.4061 46.7539Z"
        fill="#D9D9D9"
        fillOpacity="0.9"
      />
    </svg>
  );
  
  export default SvgIcon;
  
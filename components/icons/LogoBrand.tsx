import Link from 'next/link';

const Logo = ({ className = '', ...props }) => (
  <div className="flex flex-row gap-3">
    <Link href="/">
      <div className="cursor-pointer flex items-center gap-3 invert">
        <svg
          width="55"
          height="63"
          viewBox="0 0 55 63"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-8 invert ${className}`}
          {...props}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.000286109 15.0742C0.000286109 14.8219 0.13615 14.5892 0.355827 14.4652L25.5145 0.262983C25.9807 -0.000175393 26.5576 0.336643 26.5576 0.871968L26.5576 15.179C26.5576 15.6835 26.2859 16.1489 25.8465 16.3969L12.2607 24.0662C12.041 24.1902 11.9051 24.4229 11.9051 24.6752L11.9051 33.741C11.9051 34.2455 11.6334 34.7109 11.1941 34.959L1.04338 40.6891C0.577198 40.9522 0.000288016 40.6154 0.000288016 40.0801L0.000286109 15.0742Z"
            fill="#0E1714"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.5738 26.8093C15.5738 26.557 15.7096 26.3243 15.9293 26.2003L40.1722 12.5151C40.6384 12.2519 41.2153 12.5887 41.2153 13.124L41.2153 27.5683C41.2153 28.0728 40.9436 28.5382 40.5043 28.7862L27.8817 35.9117C27.662 36.0357 27.5262 36.2684 27.5262 36.5207V44.5316C27.5262 45.0362 27.2544 45.5016 26.8151 45.7496L16.6169 51.5065C16.1507 51.7697 15.5738 51.4329 15.5738 50.8976L15.5738 26.8093Z"
            fill="#0E1714"
          />
          <path
            d="M30.9838 37.7409C30.5454 37.9892 30.2744 38.4541 30.2744 38.9579L30.2744 60.6006C30.2744 61.6721 31.4299 62.3456 32.3623 61.8176L54.2908 49.3985C54.7292 49.1503 55.0002 48.6854 55.0002 48.1815L55.0002 26.5389C55.0002 25.4673 53.8447 24.7938 52.9123 25.3219L30.9838 37.7409Z"
            fill="#0E1714"
          />
        </svg>
        <h1 className="text-2xl mt-2 text-white">Repack</h1>
      </div>
    </Link>
  </div>
);

export default Logo;

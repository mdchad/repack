import GitHub from 'components/icons/GitHub';

export default function Footer() {
  return (
    <footer className="bg-white text-[#293C4A] pt-6">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between p-5 flex-col md:flex-row items-center gap-4">
          <div className="flex gap-2 md:gap-[1em] flex-col-reverse md:flex-row items-center">
            <h1>Repack</h1> <GitHub />
          </div>

          <div className="flex flex-col gap-[1em]">
            <ul className="flex flex-row gap-[1em]">
              <li>Pricing</li>
              <li>Support</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>

            <ul className="flex flex-row gap-3 justify-center md:justify-end">
              <li>
                <GitHub />
              </li>
              <li>
                <GitHub />
              </li>
              <li>
                <GitHub />
              </li>
              <li>
                <GitHub />
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-[1em] h-px bg-gray-200 border-0 light:bg-gray-700" />

        <div className="flex justify-center p-5">
          <span className="text-sm text-[#293C4A] font-thin">
            Copyright © 2022 <strong className="font-bold">REPACK</strong>. All
            rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

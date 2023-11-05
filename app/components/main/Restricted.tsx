export default function Restricted() {
  return (
    <div className="flex mt-40 justify-center">
      <div className="bg-gray-3 border border-gray-2 w-96 h-auto">
        <div className="text-white font-semibold text-xl border-b border-gray-2 px-4 py-2">
          <p>Restricted Territory</p>
        </div>
        <div className="px-4 mt-4">
          <p className="text-gray-1 text-xs">
            It appears that you are accessing Vertex from a Restricted
            Territory. Unfortunately, we are not able to support users from the
            following Restricted Territories at this time:
          </p>
        </div>
        <div className="text-gray-1 text-xs mx-4 my-4 border border-gray-2">
          <div className="p-2">
            <p>Belarus</p>
            <p>Cuba</p>
            <p>Iran</p>
            <p>North Korea</p>
            <p>Russia</p>
            <p>Syria</p>
            <p>Ukraine</p>
            <p>United Kingdom</p>
            <p>United States of America</p>
          </div>
        </div>
        <div className="px-4 my-4">
          <p className="text-gray-1 text-xs">
            Please refer to our{' '}
            <a
              href="https://vertexprotocol.com/docs/TermsOfUse.pdf"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Terms of Use
            </a>{' '}
            for additional information.
          </p>
        </div>
      </div>
    </div>
  );
}

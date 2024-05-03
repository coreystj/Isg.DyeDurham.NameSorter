import CopyToClipboardInput from "../Common/CopyClipboard";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";


export default function Main() {
    
      const ViewGitHub = () => {
        const url = "https://github.com/coreystj/Isg.DyeDurham.NameSorter";
        window.open(url, "_blank");
      }
    
      const onDocumentationClick = () => {


      }
    return (
        <div className="w-100 text-dark overflow-auto">
        <NavigationBar />
        <div className="w-100">
          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', backgroundPosition: 'bottom', background: "linear-gradient(to left, black, transparent), url('./assets/screenshots/Metaverse-community.jpeg')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col-auto">
                <h1 className="text-xl font-medium text-light text-outline text-align-right">Getting Started!</h1>
                <p className="text-light text-outline text-align-right  m-0 p-0">Get started today and view our documentation!</p>
                <p className="text-light text-outline text-align-right">Easy to follow, easy to use, and easy to integrate.</p>
                <button onClick={onDocumentationClick} className="btn btn-success float-right" style={{ float: 'right' }}>Get Started Here!</button>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', background: "linear-gradient(to right, black, transparent), url('./assets/screenshots/cobrascript.png')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col">
                <h1 className="text-xl font-medium text-light text-outline">Open Source!</h1>
                <p className="text-light text-outline m-0 p-0">Name Sorter is an open source tool,</p>
                <p className="text-light text-outline">available to all for your sorting needs.</p>
                <button onClick={ViewGitHub} className="btn btn-warning m-2"><img className="m-1 p-0" width="16" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />View GitHub</button>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', backgroundPosition: 'bottom', background: "linear-gradient(to left, black, transparent), url('./assets/screenshots/nugetfriendly.png')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col-auto">
                <h1 className="text-xl font-medium text-light text-outline text-align-right">NuGet Friendly</h1>
                <p className="text-light text-outline text-align-right m-0 p-0">Install the library within your .NET project today!</p>
                
                <p className="text-outline text-align-right text-dark m-0 p-0 bg-light">Install-Package Isg.DyeDurham.NameSorter.Lib</p>

                <p className="text-light text-outline text-align-right">Use our proprietary NuGet feed to access our latest tools.</p>

                <CopyToClipboardInput/>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', backgroundPosition: 'center', background: "linear-gradient(to right, black, transparent), url('./assets/screenshots/cross-platform.webp')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col">
                <h1 className="text-xl font-medium text-light text-outline">Lightweight</h1>
                <p className="text-light m-0 p-0 text-outline">Easy to use and easy to integrate!</p>
                <p className="text-light text-outline">Sort your names with ease.</p>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', backgroundPosition: 'center', background: "linear-gradient(to left, black, transparent), url('./assets/screenshots/eco-friendly.webp')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col-auto">
                <h1 className="text-xl font-medium text-light text-outline text-align-right">Environmentally Friendly</h1>
                <p className="text-light m-0 p-0 text-outline text-align-right">Using AWS to host our files,</p>
                <p className="text-light text-outline text-align-right">you can be sure that keeping the lights on will cost second to none.</p>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', background: "linear-gradient(to right, black, transparent), url('./assets/screenshots/cobalt-mining.jpg')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col">
                <h1 className="text-xl font-medium text-light text-outline">Why Name Sorter?</h1>
                <p className="text-light m-0 p-0 text-outline">Have you ever seen a more useful application?</p>
                <p className="text-light text-outline">How about having a library that is versatile!</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
  
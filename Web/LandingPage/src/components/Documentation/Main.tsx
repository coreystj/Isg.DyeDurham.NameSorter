import CopyToClipboardInput from "../Common/CopyClipboard";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";


export default function Main() {
    
      const ViewGitHub = () => {
        const url = "https://github.com/coreystj/Isg.DyeDurham.NameSorter";
        window.open(url, "_blank");
      }
    
      const DownloadClient = () => {
        const link = document.createElement('a');
        link.href = 'https://namesorter-develop.s3.us-east-2.amazonaws.com/Builds/name-sorter.zip';
        link.setAttribute('download', 'name-sorter.zip'); // Optional, specifies the filename that user will download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <div className="w-100 text-dark overflow-auto">
        <NavigationBar />
        <div className="w-100">
          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', backgroundPosition: 'bottom', background: "linear-gradient(to left, black, transparent), url('./assets/screenshots/downloadbackground.jpg')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col-auto">
                <h1 className="text-xl font-medium text-light text-outline text-align-right">Step 1: Download our Tool!</h1>
                <p className="text-light text-outline text-align-right">Start by downloading our CLI</p>
                <button onClick={DownloadClient} className="btn btn-success float-right" style={{ float: 'right' }}>Download CLI Here</button>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', backgroundPosition: 'bottom', background: "linear-gradient(to right, black, transparent), url('./assets/screenshots/extract.png')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col">
                <h1 className="text-xl font-medium text-light text-outline">Step 2: Unzip!</h1>
                <p className="text-light text-outline m-0 p-0">Unzip the CLI tool.</p>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', backgroundPosition: 'bottom', background: "linear-gradient(to left, black, transparent), url('./assets/screenshots/nugetfriendly.png')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col-auto">
                <h1 className="text-xl font-medium text-light text-outline text-align-right">Step 3: Execute</h1>
                <p className="text-light text-outline text-align-right m-0 p-0">Using the "name-sorter" app you can sort your names easily!</p>
                <p className="text-light text-outline text-align-right m-0 p-0">-i is your input file path.</p>
                <p className="text-light text-outline text-align-right">-o is your output file path.</p>

                <CopyToClipboardInput defaultValue={'name-sorter -i unsorted-names-list.txt -o sorted-names-list.txt'}/>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', backgroundPosition: 'center', background: "linear-gradient(to right, black, transparent), url('./assets/screenshots/result.png')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col">
                <h1 className="text-xl font-medium text-light text-outline">The Result</h1>
                <p className="text-light m-0 p-0 text-outline">A text file created at your designated location 'sorted-names-list.txt'.</p>
                <p className="text-light text-outline">With a nice formatted display within your console window of your ordered results.</p>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
  
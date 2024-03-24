import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import './fs.scss';

// Function to get the contents of a folder
const getFolderContents = async (url) => {
    try {
        const response = await fetch(url)
        const contentType = response.headers.get('Content-Type');

        return contentType.includes('application/json') ? await response.json() : await response.text();
    } catch (error) {
        console.error(error);
    }
}

const Fs = () => {

    const [fileList, setFileList] = useState(null);
    const [historyList, setHistoryList] = useState([]);
    const [file, setFile] = useState(null);
    const inputFile = useRef(null);

    const _APIURL = 'http://localhost:5000/'

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        navigate(`/`);
        // can't resolve location
        //const pathName = location.pathname;
        const fetchData = async () => {
            const data = await getFolderContents(`${_APIURL}files`);
            setFileList(data);
        };
        fetchData();
    }, [])

    // Function for updating the list of files when opening a new folder
    const updateOpenedFolder = async (newHist) => {
        setHistoryList(newHist);
        const target = newHist.join('/');
        navigate(`/${target}`);
        const data =  await getFolderContents(`${_APIURL}files?filename=${target}`);
        setFileList(data);
    }

    // Click handler for retrieving files in the folder
    const getFilesInFolder = async (event) => {
        const newHistpory = [...historyList, event.target.textContent];
        await updateOpenedFolder(newHistpory);
    }

    // Back button handler
    const onGoBack = async () => {
        const newHistpory = [...historyList];
        newHistpory.pop();
        await updateOpenedFolder(newHistpory);
    }

    // Component content based on the list of files
    const content = fileList ? <View historyList={historyList} getFilesInFolder={(e) => getFilesInFolder(e)} files={fileList}/> : <h3>Loading...</h3>
    
    // File submission
    const onSendFile = useCallback( async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
    
            await fetch(`${_APIURL}upload`, {
                method: 'POST',
                body: formData,
            });
            
            // Clearing the file selection field after submission
            if (inputFile.current) {
                inputFile.current.value = '';
            }
            setFile(null);
        } catch (error) {
            console.error(error);
        }
    }, [file])

    return (
        <section className="files">
            <h2>Documents: </h2>
            {content}
            <button className="files-action files-wrapper" onClick={onGoBack}>
                <svg width={17} height={17} style={{"marginRight": '5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" /></svg>
                <div>Go back</div>
            </button>

            <div className="files-wrapper">
                <div className="files-input">
                    <input id="file" ref={inputFile} type="file" onChange={e => setFile(e.target.files[0])} />
                    <label htmlFor="file" className="files-action">
                        <svg width={20} height={20} style={{"marginRight": '5px'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" /></svg>
                        <div>Select File</div></label>
                    <span className="file-name">{file ? file.name : 'No file chosen'}</span>
                </div>
                <button disabled={!file ? true : false} className="files-action files-wrapper files-send" onClick={onSendFile}>
                    <div>Send</div>
                    <svg width={20} height={20} style={{"marginLeft": '5px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6.905 9.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V18a.75.75 0 0 0 1.5 0v-4.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" /><path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" /></svg>
                </button>
            </div>
        </section>
    )
}

const View = ({files, getFilesInFolder, historyList}) => {
    const {extension, data, src} = files;
    if(files.length === 0) {
        return <h4>Empty folder</h4>
    }
    if (!Array.isArray(files)) {
        console.log(files)
        switch (extension) {
            case '.json':
            case '.txt': 
                return <textarea>{data}</textarea>
            case '.png':
            case '.jpg':
            case '.jpeg':
                console.log(src)
                return <img style={{ width: '400px', height: '400px', 'objectFit': 'contain' }} src={src} alt='alt'/>
            default:
                break;
        }
    }
    return (
        <>
            {files.map((file, index) => (
                <ul
                    key={index}>
                    <li className={file.type === 'folder' ? 'folder' : 'file'}>
                            <button onClick={(e) => getFilesInFolder(e)}>{file.fileName}</button>
                    </li>
                </ul>
            ))}
        </>
    )
}

export default Fs;
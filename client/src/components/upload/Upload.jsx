import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { useRef } from "react";

const urlEndpoint = process.env.REACT_APP_VITE_IMAGE_KIT_ENDPOINT;
const publicKey = process.env.REACT_APP_VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3030/api/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({setImage}) => {

    const ikUploadRef = useRef(null)

    const onError = err => {
        console.log("Error", err);
    };
      
    const onSuccess = res => {
        console.log("Success", res);
        setImage(prev=>({...prev, isLoading:false, dbData: res}))
    };
      
    const onUploadProgress = progress => {
        console.log("Progress", progress);
    };
      
    const onUploadStart = evt => {
      const file = evt.target.files[0]

      const reader = new FileReader();
      reader.onLoadend = () => {
        setImage(prev=>({...prev, isLoading:true, aiData:{
          inlineData : {
            data:reader.result.split(",")[1],
            mimeType : file.type
          }
        }}))
      }
      reader.readAsDataURL(file);
    };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        style = {{display:"none"}}
        ref={ikUploadRef}
      />
      {<label onClick={()=>ikUploadRef.current.click()}>
        <img src="/attachment.png" />
      </label>}
    </IKContext>
  );
};

export default Upload;

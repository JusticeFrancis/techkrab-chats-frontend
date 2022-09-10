import { Folder } from "@mui/icons-material";

export const User = ({ data }) => (
  <div className=" flex items-center my-2 justify-end  ">
    <div className=" w-3/5  space-x-2 bg-[#075e54] text-white rounded-tl-lg  rounded-b-lg py-1 px-2 ">
      {data.has_file && (
        <div>
          {data.file.type.substr(0,4) === "image" ? (
            <div>
              <img
                src={URL.createObjectURL(data.file)}
                className="  bg-[#075e54] rounded-lg "
              />{" "}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Folder
                sx={{
                  fontSize: "35px",
                  color: "blue",
                  ":hover": { color: "purple" },
                }}
                onClick={() => {
                  window.open(URL.createObjectURL(data.file), "_blank");
                }}
              />

              <div className="italic text-[14px] text-gray-200 ">
                {" "}
                you just sent a file ({(data.file.size / 1000).toFixed(
                  0
                )} kb){" "}
              </div>
            </div>
          )}
        </div>
      )}

      <div className=" text-[14px] ">{data.msg}</div>
    </div>
  </div>
);

export const Guest = ({ data }) => (
  <div className=" flex items-center my-2 ">
    <div className=" w-3/5  space-x-2  bg-[#435a64] text-white rounded-tr-lg  rounded-b-lg py-1 px-2 ">
      {data.has_file && (
        <div>
          {data.file_extension.substr(0,4) === "image" ? (
            <div>
              <img
                src={"https://techkrab-socket-backend-production.up.railway.app/tmp/" + data.filename}
                className=" bg-[#435a64] rounded-lg "
              />{" "}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Folder
                sx={{
                  fontSize: "35px",
                  color: "blue",
                  ":hover": { color: "purple" },
                }}
                onClick={() => {
                  window.open(
                    "https://techkrab-socket-backend-production.up.railway.app/tmp/" + data.filename,
                    "_blank"
                  );
                }}
              />
              <div className="italic text-[14px] text-gray-200 ">
                you just recived a file ({data.file_extension.substr(0, 20)} :
                type)
              </div>
            </div>
          )}
        </div>
      )}
      <div className=" text-[14px] ">{data.msg}</div>
    </div>
  </div>
);

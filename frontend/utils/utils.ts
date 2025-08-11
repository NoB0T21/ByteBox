export const getFileType = (filename: string) => {
    // Extract extension
    const parts = filename.split(".");
    if (parts.length < 2) {
      return { type: "other", extension: "" };
    }
  
    const extension = parts.pop()?.toLowerCase() || "";
    // Infer type based on common extensions
    let type = "other";
    
    if (["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(extension)) {
      type = "image";
    } else if (["mp4", "mkv", "avi", "mov", "wmv", "webm"].includes(extension)) {
      type = "video";
    } else if (["mp3", "wav", "ogg", "flac", "m4a"].includes(extension)) {
      type = "video";
    } else if (["pdf"].includes(extension)) {
      type = "document";
    } else if (["doc", "docx", "xls", "xlsx","txt","ppt", "pptx"].includes(extension)) {
      type = "document";
    } else if (["md", "json", "xml", "yaml", "yml", "csv","zip", "rar", "7z", "tar", "gz"].includes(extension)) {
      type = "other";
    } 
  
    return { type, extension };
  };
  
export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const getFileSize = (filesize: number) => {
  if(filesize < 1024) {return filesize+' Bytes'}
  else if(filesize < 1024 * 1024) {const size = filesize/1024;return size.toFixed(1)+' KB'}
  else if(filesize < 1024 * 1024 * 1024) {const size = filesize/(1024*1024);return size.toFixed(1)+' MB'}
  else {const size = filesize/(1024*1024*1024);return size.toFixed(1)+' GB'}
}

export const getFileSizeinPercentage = (filesize: number) => {
  const maxSize = 500 * 1024 * 1024; // 500 MB in bytes
  const percentage = ((filesize / maxSize) * 100);
  return Math.min(percentage, 75).toFixed(1);
}
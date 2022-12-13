import axios from "../axios";
import Papa from "papaparse";
import { useMutation } from "@tanstack/react-query";

export const EXPORT_TYPES = ["CSV", "JSON"];

export default function useExportToFile() {
  const { mutate: exportToFile, ...rest } = useMutation({
    mutationFn: () => {
      return axios.get("/api/export");
    },
    onSuccess: (results, variables) => {
      if (variables.type === "JSON") {
        const jsonData = JSON.stringify(results.data.records, null, 2);
        openSaveFileDialog(jsonData, "follows.json", "json");
      } else {
        const csvData = Papa.unparse(results.data.records);
        openSaveFileDialog(csvData, "follows.csv", "csv");
      }
    },
  });

  return { exportToFile, ...rest };
}

const openSaveFileDialog = (data, filename, mimetype) => {
  // copied from https://github.com/mholt/PapaParse/issues/175#issuecomment-514922286
  if (!data) return;

  var blob =
    data.constructor !== Blob
      ? new Blob([data], { type: mimetype || "application/octet-stream" })
      : data;

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
    return;
  }

  var lnk = document.createElement("a"),
    url = window.URL,
    objectURL;

  if (mimetype) {
    lnk.type = mimetype;
  }

  lnk.download = filename || "untitled";
  lnk.href = objectURL = url.createObjectURL(blob);
  lnk.dispatchEvent(new MouseEvent("click"));
  setTimeout(url.revokeObjectURL.bind(url, objectURL));
};

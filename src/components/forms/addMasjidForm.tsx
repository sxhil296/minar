import InputField from "./inputField";

export default function AddMasjidForm() {
  return (
    <form className="w-full max-w-6xl mx-auto flex flex-col gap-4">
      <InputField
        id="masjid_name"
        label="Masjid Name"
        placeholder={"Enter Masjid Name"}
        name="masjid_name"
      />

      <button
        type="submit"
        className="px-6 py-2 bg-emerald-800 text-white rounded hover:bg-emerald-700 transition-colors"
      >
        Add Masjid
      </button>
    </form>
  );
}

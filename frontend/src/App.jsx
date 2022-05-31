import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [daftarMahasiswa, setdaftarMahasiswa] = useState([]);
  const [currentId, setCurrentId] = useState(-1);
  const [input, setInput] = useState({
    nama: "",
    nim: "",
    email: "",
    telepon: "",
    angkatan: 0,
    semester: 0,
    IPK: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/mahasiswa`);
        const dataMhs = response.data;
        setdaftarMahasiswa(dataMhs.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [daftarMahasiswa, setdaftarMahasiswa]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === -1) {
      axios
        .post(`http://localhost:8080/api/mahasiswa`, input)
        .then(() => {
          setdaftarMahasiswa([...daftarMahasiswa, input]);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios
        .put(`http://localhost:8080/api/mahasiswa/${currentId}`, input)
        .then((res) => {
          daftarMahasiswa.find((obj) =>
            obj.id === currentId ? { ...obj, input } : obj
          );
          setdaftarMahasiswa([...daftarMahasiswa]);
          setCurrentId(-1);
        });
    }

    setInput({
      nama: "",
      nim: "",
      email: "",
      telepon: "",
      angkatan: 0,
      semester: 0,
      IPK: 0,
    });
  };

  const handleEdit = (event) => {
    let idMahasiswa = parseInt(event.target.value);
    axios
      .get(`http://localhost:8080/api/mahasiswa/${idMahasiswa}`)
      .then((res) => {
        let mahasiswa = res.data.data[0];
        setInput({
          nama: mahasiswa.nama,
          nim: mahasiswa.nim,
          email: mahasiswa.email,
          telepon: mahasiswa.telepon,
          angkatan: mahasiswa.angkatan,
          semester: mahasiswa.semester,
          IPK: mahasiswa.IPK,
        });
        setCurrentId(mahasiswa.id);
      });
  };

  const handleDelete = (event) => {
    let idMahasiswa = parseInt(event.target.value);

    axios
      .delete(`http://localhost:8080/api/mahasiswa/${idMahasiswa}`)
      .then(() => {
        let newMahasiswa = daftarMahasiswa.filter((mahasiswa) => {
          return mahasiswa.id !== idMahasiswa;
        });

        setdaftarMahasiswa([...newMahasiswa]);
      });
  };

  const handleReset = (event) => {
    event.preventDefault();

    setInput({
      nama: "",
      nim: "",
      email: "",
      telepon: "",
      angkatan: 0,
      semester: 0,
      IPK: 0,
    });

    setCurrentId(-1);
  };

  return (
    <div className="min-h-screen w-full bg-pink-50 flex space-x-5 p-5">
      <div className="w-4/12 bg-white p-5 rounded-md shadow-xl border-pink-200 border-2">
        <h4 className="w-full text-2xl text-pink-500 font-bold leading-snug mb-6 uppercase text-center">
          {currentId === -1 ? "Tambah Data Mahasiswa" : "Edit Data Mahasiswa"}
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="nama"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Nama Lengkap
            </label>
            <input
              onChange={handleChange}
              value={input.nama}
              type="nama"
              id="nama"
              name="nama"
              className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 focus:placeholder-gray-300"
              placeholder="El-Savadore Tekilla"
              required
            />
          </div>
          <div className="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
              <label
                htmlFor="nim"
                className="block mb-1 text-sm font-medium text-gray-600"
              >
                NIM
              </label>
              <input
                onChange={handleChange}
                value={input.nim}
                type="text"
                id="nim"
                name="nim"
                className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 focus:placeholder-gray-300"
                placeholder="43320004"
                required
              />
            </div>
            <div>
              <label
                htmlFor="angkatan"
                className="block mb-1 text-sm font-medium text-gray-600"
              >
                Angkatan
              </label>
              <input
                onChange={handleChange}
                value={input.angkatan}
                type="number"
                id="angkatan"
                name="angkatan"
                className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 focus:placeholder-gray-300"
                placeholder="2020"
                required
              />
            </div>
            <div>
              <label
                htmlFor="semester"
                className="block mb-1 text-sm font-medium text-gray-600"
              >
                Semester
              </label>
              <input
                onChange={handleChange}
                value={input.semester}
                type="number"
                id="semester"
                name="semester"
                className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 focus:placeholder-gray-300"
                placeholder="4"
                required
              />
            </div>
            <div>
              <label
                htmlFor="IPK"
                className="block mb-1 text-sm font-medium text-gray-600"
              >
                IPK
              </label>
              <input
                onChange={handleChange}
                value={input.IPK}
                type="number"
                max="4"
                id="IPK"
                name="IPK"
                inputMode="decimal"
                className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 focus:placeholder-gray-300"
                placeholder="4.00"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              value={input.email}
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 focus:placeholder-gray-300"
              placeholder="atang@gmail.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="telepon"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Nomor Telepon
            </label>
            <input
              onChange={handleChange}
              value={input.telepon}
              type="text"
              name="telepon"
              id="telepon"
              className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-300 focus:placeholder-gray-300"
              placeholder="082114069625"
              required
            />
          </div>
          {currentId === -1 ? (
            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 uppercase"
              >
                Tambah
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <button
                className="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-6/12 px-5 py-2.5 uppercase"
                onClick={handleReset.bind(this)}
              >
                Reset
              </button>
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-6/12 px-5 py-2.5 uppercase"
              >
                Update
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="w-8/12">
        <table className="min-w-max w-full table-auto shadow-xl">
          <thead>
            <tr className="bg-pink-500 text-gray-100 uppercase text-sm leading-normal">
              <th className="py-3 px-2 text-left">No</th>
              <th className="py-3 px-3 text-left">Nama</th>
              <th className="py-3 px-3 text-left">NIM</th>
              <th className="py-3 px-3 text-left">Email</th>
              <th className="py-3 px-3 text-left">Telepon</th>
              <th className="py-3 px-3 text-left">Angkatan</th>
              <th className="py-3 px-3 text-left">Semester</th>
              <th className="py-3 px-3 text-left">IPK</th>
              <th className="py-3 px-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {daftarMahasiswa.length === 0 ? (
              <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                <td
                  colSpan={9}
                  className="text-center py-3 animate-pulse tracking-normal font-medium"
                >
                  Tidak ada data mahasiswa
                </td>
              </tr>
            ) : (
              daftarMahasiswa.map((mahasiswa, index) => {
                return (
                  <tr
                    className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                    key={index}
                  >
                    <td className="py-3 px-2">
                      <span className="font-bold">{index + 1}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center">
                        <div className="mr-1">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={`https://randomuser.me/api/portraits/men/${index}.jpg`}
                          />
                        </div>
                        <span className="font-medium">{mahasiswa.nama}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-medium">{mahasiswa.nim}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-medium">{mahasiswa.email}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-medium">{mahasiswa.telepon}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-green-200 text-green-600 py-1 px-6 rounded-full text-xs font-medium">
                        {mahasiswa.angkatan}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-blue-200 text-blue-600 py-1 px-8 rounded-full text-xs font-medium">
                        {mahasiswa.semester}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-medium animate-pulse text-red-400">
                        {mahasiswa.IPK}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-left">
                      <div className="flex item-center space-x-1">
                        <button
                          className="py-1 px-2 rounded transform bg-purple-200 hover:text-purple-500 hover:scale-110 cursor-pointer text-xs transition-all duration-100"
                          onClick={handleEdit}
                          value={mahasiswa.id}
                        >
                          Edit
                        </button>
                        <button
                          className="py-1 px-2 rounded transform bg-red-300 hover:text-red-500 hover:scale-110 cursor-pointer text-xs transition-all duration-100"
                          onClick={handleDelete}
                          value={mahasiswa.id}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;

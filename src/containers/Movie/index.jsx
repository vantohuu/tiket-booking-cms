import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Input, message } from "antd";
import {
  fetchMovies,
  fetchActors,
  fetchGenres,
  showBeginEditModal,
  deleteMovie,
  clearMessages,
} from "./actions";
import {
  selectMovies,
  selectIsLoading,
  selectSuccessMessage,
  selectFailedMessage,
} from "./selectors";
import PageLayout from "../../layouts/PageLayout";
import AddEditMovie from "./AddEditPage";
import Loading from "../../components/Loading";


const MovieList = () => {
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchText, setSearchText] = useState("");
  const messageText = useSelector(selectSuccessMessage);
  const errorText = useSelector(selectFailedMessage);
  const movies = useSelector(selectMovies) || [];
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchActors());
    dispatch(fetchGenres());
  }, []);

  useEffect(() => {
    if (messageText != null && messageText !== "") {
      message.success(messageText);
      dispatch(clearMessages());
    }
  }, [messageText, dispatch]);

  useEffect(() => {
    if (errorText != null && errorText !== "") {
      message.error(errorText);
      dispatch(clearMessages());
    }
  }, [errorText, dispatch]);

  const handleAddClick = () => {
    setModalType("add");
    setSelectedMovie(null);
    dispatch(showBeginEditModal());
  };

  const handleEditClick = (movie) => {
    setModalType("edit");
    setSelectedMovie(movie);
    dispatch(showBeginEditModal());
  };

  const handleDeleteClick = (movie) => {
    dispatch(deleteMovie(movie.id));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      width: "5%",
    },
    {
      title: "Tên phim",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => record.title.toLowerCase().includes(value),
      width: "15%",
    },
    {
      title: "Poster",
      dataIndex: "poster",
      key: "poster",
      width: "10%",
      render: (url) =>
        url ? (
          <img
            src={url}
            alt="Poster"
            style={{ width: "60px", height: "90px", objectFit: "cover" }}
          />
        ) : (
          "Không có"
        ),
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      key: "language",
      width: "10%",
    },
    {
      title: "Thời lượng (phút)",
      dataIndex: "duration",
      key: "duration",
      width: "10%",
    },
    {
      title: "Ngày phát hành",
      dataIndex: "releaseDate",
      key: "releaseDate",
      width: "10%",
      render: (date) => (date ? new Date(date).toLocaleDateString() : ""),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: "10%",
      render: (date) => (date ? new Date(date).toLocaleDateString() : ""),
    },
    {
      title: "Thể loại",
      dataIndex: "genres",
      key: "genres",
      width: "15%",
      render: (genres) =>
        genres?.length > 0 ? genres.map((g) => g.name).join(", ") : "Không có",
    },
    {
      title: "Diễn viên",
      dataIndex: "actors",
      key: "actors",
      width: "20%",
      render: (actors) =>
        actors?.length > 0
          ? actors.map((a) => `${a.firstName} ${a.lastName}`).join(", ")
          : "Không có",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status) => {
        switch (status) {
          case "NOW_SHOWING":
            return "Đang chiếu";
          case "COMING_SOON":
            return "Sắp chiếu";
          case "ENDED":
            return "Ngừng chiếu";
          default:
            return status;
        }
      },
    },
    {
      title: "Sửa",
      key: "edit",
      width: "5%",
      render: (_, movie) => (
        <Button onClick={() => handleEditClick(movie)}>Sửa</Button>
      ),
    },
    {
      title: "Xóa",
      key: "delete",
      width: "5%",
      render: (_, movie) => (
        <Button danger onClick={() => handleDeleteClick(movie)}>
          Xóa
        </Button>
      ),
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <PageLayout>
      <div>
        <h2 className="text-xl font-bold mb-4">Danh sách phim</h2>
        <div className="mb-4">
          <Input.Search
            placeholder="Tìm theo tên phim"
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
            style={{ width: 300, marginRight: 16 }}
            allowClear
          />
          <Button type="primary" onClick={handleAddClick}>
            Thêm phim mới
          </Button>
        </div>

        <Table bordered columns={columns} dataSource={movies} rowKey="id" />
        <AddEditMovie type={modalType} movie={selectedMovie} />
      </div>
    </PageLayout>
  );
};

export default MovieList;

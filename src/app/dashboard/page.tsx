"use client";
import { ContentBox } from "@/components/ContentBox";
import MovingDotsBackground from "@/components/MovingDotsBackground";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the hamburger menu

interface Link {
	id: string;
	url: string;
	clicks: number;
	lastClick: string;
	createdAt: string;
}

export default function Dashboard() {
	const router = useRouter();
	const [links, setLinks] = useState<Link[]>([]);
	const [linksLoaded, setLinksLoaded] = useState<boolean>(false);
	const [shortLink, setShortLink] = useState<string>("");
	const [longLink, setLongLink] = useState<string>("");
	const [created, setCreated] = useState<string>("");
	const [totalClicks, setTotalClicks] = useState<number>(0);
	const [lastClick, setLastClick] = useState<string>("");
	const [showModal, setShowModal] = useState<boolean>(false);
	const [modalLongLink, setModalLongLink] = useState<string>("");
	const [modalShortLink, setModalShortLink] = useState<string>("");
	const [modalError, setModalError] = useState<string | null>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // For managing sidebar toggle on mobile

	async function fetchLinks() {
		try {
			const response = await axios.get("/api/me", {
				withCredentials: true,
			});
			setLinks(response.data.links);
			setLinksLoaded(true);
		} catch (error) {
			console.error("Error fetching links:", error);
		}
	}

	useEffect(() => {
		fetchLinks();
	}, []);

	function isCurrentValid() {
		return (
			shortLink !== "" &&
			longLink !== "" &&
			created !== "" &&
			totalClicks !== undefined
		);
	}

	async function deleteLink() {
		try {
			await axios.delete(`/api/link/${shortLink}`, {
				withCredentials: true,
			});
			setLinks(links.filter((link) => link.id !== shortLink));
			setShortLink("");
			setLongLink("");
			setCreated("");
			setTotalClicks(0);
			setLastClick("");
		} catch (error) {
			console.error("Error deleting link:", error);
		}
	}

	async function setData(link: Link) {
		setShortLink(link.id);
		setLongLink(link.url);
		setCreated(link.createdAt);
		setTotalClicks(link.clicks);
		setLastClick(link.lastClick);
	}

	const handleCreateNewLink = async (event: React.FormEvent) => {
		event.preventDefault();
		if (modalShortLink === "" || modalLongLink === "")
			return setModalError("Please fill out the required information!");
		const allowedRegex = /^[a-zA-Z0-9-_]+$/;
		if (!allowedRegex.test(modalShortLink))
			return setModalError("Invalid characters in link name!");
		if (modalShortLink.length > 20)
			return setModalError("LiNK too long! (> 20 characters)");
		try {
			await axios
				.post(
					"/api/link/" + modalShortLink,
					{ url: modalLongLink },
					{ withCredentials: true }
				)
				.then((res) => fetchLinks());
			clearModal();
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response?.status === 409) {
				setModalError("LiNK already taken!");
			} else {
				setModalError("An error occurred. Try again later.");
			}
		}
	};

	function clearModal() {
		setModalShortLink("");
		setModalLongLink("");
		setModalError(null);
		setShowModal(false);
	}

	return (
		<main className="relative flex items-center justify-center min-h-screen select-none overflow-hidden bg-gray-900">
			<MovingDotsBackground />

			<div className="relative z-20 flex w-full h-screen p-4 gap-4">
				{/* Sidebar (Hidden on mobile, visible on large screens) */}
				<div
					className={` lg:block fixed lg:static ${
						isSidebarOpen ? "translate-x-0" : "-translate-x-full"
					} lg:translate-x-0 transition-transform duration-300 ease-in-out w-full lg:w-1/4 bg-white lg:bg-opacity-5 bg-opacity-20 backdrop-blur-xl lg:rounded-3xl flex flex-col p-4 top-0 left-0 h-screen lg:h-auto z-40`}>
					<h1 className="text-4xl text-white font-bold mb-4 text-center">
						Your LiNKs
					</h1>
					<div className="h-full flex flex-col justify-start gap-4">
						{linksLoaded ? (
							links && links.length > 0 ? (
								links.map((link) => (
									<button
										key={link.id}
										className="w-full p-2 text-white bg-white bg-opacity-20 rounded-3xl hover:bg-opacity-45 transition duration-300"
										onClick={() => {
											setData(link);
											setIsSidebarOpen(false);
										}}>
										{link.id} -{" "}
										{link.url.length > 20
											? link.url
													.replace("https://", "")
													.replace("http://", "0")
													.slice(0, 20) + "..."
											: link.url
													.replace("https://", "")
													.replace("http://", "0")}
									</button>
								))
							) : (
								<p className="text-center text-xl mt-2">
									No links found!
								</p>
							)
						) : (
							<p className="text-center text-xl mt-2">
								Loading...
							</p>
						)}
					</div>
					<hr className="ml-2 mr-2 rounded-full my-4 border-gray-600" />
					<button
						className="w-full p-2 text-white bg-white bg-opacity-20 rounded-3xl hover:bg-opacity-95 transition duration-300 shadow-lg transform hover:scale-105"
						onClick={() => setShowModal(true)}>
						Create new link
					</button>
				</div>

				{/* Main Content */}
				<div className="lg:w-3/4 w-full h-full flex flex-col items-center justify-center gap-5">
					{isSidebarOpen && (
						<div
							className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
							onClick={() => setIsSidebarOpen(false)}></div>
					)}
					{/* Hamburger Menu */}
					<div className="lg:hidden relative items-start justify-start z-50 right-0 ml-auto">
						<button
							className="text-white text-3xl bg-white bg-opacity-10 rounded-full p-2 focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-110"
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
							{isSidebarOpen ? <FaTimes /> : <FaBars />}
						</button>
					</div>
					<ContentBox className="w-full h-full min-w-full max-w-full flex flex-col justify-between p-6 bg-gray-800 bg-opacity-10 rounded-2xl shadow-lg">
						<h1 className="text-white text-3xl mb-2 border-b border-gray-600 pb-2 w-full">
							Link Information
						</h1>
						{isCurrentValid() ? (
							<div className="h-full w-full min-w-full flex flex-col">
								<div className="h-full flex flex-col gap-2 flex-grow">
									<p className="text-gray-300">
										Short link:{" "}
										<span
											className="text-white cursor-pointer hover:underline"
											onClick={() =>
												router.push(
													`https://l.xvcf.dev/${shortLink}`
												)
											}>
											https://l.xvcf.dev/{shortLink}
										</span>
									</p>
									<p className="text-gray-300">
										Redirects to:{" "}
										<span
											className="text-white cursor-pointer hover:underline"
											onClick={() =>
												router.push(longLink)
											}>
											{longLink}
										</span>
									</p>
									<p className="text-gray-300">
										Created:{" "}
										<span className="text-white">
											{new Date(created).getTime() === 0
												? "never"
												: new Date(
														created
												  ).toLocaleString()}
										</span>
									</p>
								</div>
								<div className="border-t border-gray-600 pt-2 w-full mt-auto">
									<div className="gap-2 w-full">
										<button
											className="w-full p-2 text-white bg-red-500 rounded-3xl hover:bg-opacity-75 backdrop-blur-lg bg-opacity-50"
											onClick={() => deleteLink()}>
											Delete
										</button>
									</div>
								</div>
							</div>
						) : (
							<p className="text-left text-xl mt-2">
								Select a link to view information!
							</p>
						)}
					</ContentBox>
					<ContentBox className="w-full h-full min-w-full max-w-full flex flex-col justify-start p-6 bg-gray-800 bg-opacity-10 rounded-2xl shadow-lg items-start">
						<h1 className="text-white text-3xl mb-2 border-b border-gray-600 pb-2 w-full">
							Link Data
						</h1>
						{isCurrentValid() ? (
							<div className="h-full w-full">
								<div className="flex flex-col gap-2 flex-grow">
									<p className="text-gray-300">
										Total clicks:{" "}
										<span className="text-white">
											{totalClicks}
										</span>
									</p>
									<p className="text-gray-300">
										Last click:{" "}
										<span className="text-white">
											{new Date(lastClick).getTime() === 0
												? "never"
												: new Date(
														lastClick
												  ).toLocaleString()}
										</span>
									</p>
								</div>
							</div>
						) : (
							<p className="text-left text-xl mt-2">
								Select a link to view data!
							</p>
						)}
					</ContentBox>
				</div>
			</div>

			{/* Modal for creating new links */}
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white bg-opacity-10 rounded-3xl p-6 w-full lg:w-1/3 backdrop-blur-xl">
						<h2 className="text-2xl mb-4">Create New LiNK</h2>
						<form onSubmit={handleCreateNewLink}>
							<div className="mb-4">
								<label
									className="block text-white text-sm font-bold mb-2"
									htmlFor="shortLink">
									Your LiNK name
								</label>
								<input
									id="shortLink"
									type="text"
									value={modalShortLink}
									onChange={(e) =>
										setModalShortLink(e.target.value)
									}
									className="w-full mb-4 p-3 rounded-full text-center border border-none focus:outline-none focus:ring-transparent text-white bg-white bg-opacity-10"
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-white text-sm font-bold mb-2"
									htmlFor="longLink">
									The target URL
								</label>
								<input
									id="longLink"
									type="text"
									value={modalLongLink}
									onChange={(e) =>
										setModalLongLink(e.target.value)
									}
									className="w-full mb-4 p-3 rounded-full text-center border border-none focus:outline-none focus:ring-transparent text-white bg-white bg-opacity-10"
								/>
							</div>
							{modalError && (
								<p className="text-red-500 text-center mb-6 -mt-2">
									{modalError}
								</p>
							)}
							<div className="flex flex-row gap-4 items-center justify-between">
								<button
									type="button"
									className="text-white p-2 w-full bg-gray-800 bg-opacity-50 rounded-3xl hover:bg-opacity-75"
									onClick={() => {
										clearModal();
									}}>
									Cancel
								</button>
								<button
									type="submit"
									className="text-white p-2 w-full bg-gray-800 bg-opacity-50 rounded-3xl hover:bg-opacity-75">
									Create
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</main>
	);
}

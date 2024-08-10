import React, { useEffect, useState, useRef } from "react";

const CodeBox = () => {
    const fullLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    const shortLink = "https://l.xvcf.dev/myShortlink";
    const [displayedLink, setDisplayedLink] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let currentIndex = 0;
        const typeLink = () => {
            if (!isAnimating) return;
            if (currentIndex < fullLink.length - 1) {
                setDisplayedLink((prev) => prev + fullLink[currentIndex]);
                currentIndex++;
                timeoutRef.current = setTimeout(typeLink, 75);
            } else {
                timeoutRef.current = setTimeout(() => {
                    setDisplayedLink("Shrinking your link...");
                    timeoutRef.current = setTimeout(() => {
                        setDisplayedLink("Done: " + shortLink);
                        setIsAnimating(false);
                        setHasAnimated(true);
                    }, 2000);
                }, 1000);
            }
        };
        if (isAnimating) {
            setDisplayedLink(fullLink[0]);
            typeLink();
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isAnimating]);

    const handleMouseEnter = () => {
        if (!isAnimating && !hasAnimated) {
            setIsAnimating(true);
        }
    };

    return (
        <div className="code-box mt-2 mb-2 w-fit text-center sm:w-full sm:px-4" onMouseEnter={handleMouseEnter}>
            <code className="bg-zinc-900 text-white px-3 py-2 rounded block sm:inline-block">
                {displayedLink || "Enter link:"}
                {isAnimating && <span className="animate-pulse pl-1 font-bold">_</span>}
            </code>
        </div>
    );
};

export default CodeBox;

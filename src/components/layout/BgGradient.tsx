export default function BackgroundGradient() {
    return (
        <>
            <div className="overflow-hidden">
                <div className="absolute bg-[#00C2FF] blur-[700px] w-[25.1875rem] h-[22.5] rounded-full -bottom-52 left-28"></div> {/* This is the bottom left filter*/}
                <div className="absolute bg-[#009CFF] blur-[600px] w-[40.625rem] h-[32.625rem] rounded-full -top-[350px] left-16"></div> {/* This is the top left filter*/}
                <div className="absolute bg-[#FF00B8] blur-[700px] w-[25.1875rem] h-[25.1875rem] rounded-full -top-[360px] right-16"></div> {/* This is the top right filter*/}
                <div className="absolute bg-[#FF00C7] blur-[700px] w-[19.8125rem] h-[19.8125rem] rounded-full -top-[240px] right-56"></div> {/* This is the top right filter2, there are 2*/}
                <div className="absolute bg-[#00B3FF] blur-[700px] w-[26.875rem] h-[24rem] rounded-full -bottom-[300px] right-20"></div> {/* This is the bottom right filter*/}
            </div>
        </>
    )
}
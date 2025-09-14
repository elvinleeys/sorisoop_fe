interface CommentProps {
  comment: string; // 외부에서 받아올 한줄평
}

export default function Comment({ comment }: CommentProps) {

    return (
        <article className="mb-[4.0625rem]">
            <h3 
                className="
                    w-full 
                    h-[1.5rem]
                    mb-3 
                    text-base 
                    !font-bold 
                    text-neutral-black
                "
            >
                한줄평
            </h3>
            <p 
                className="
                    w-full 
                    h-[6.4375rem] 
                    p-[0.625rem]
                    mb-2 
                    rounded-[0.42rem]
                    bg-neutral-gray-bg
                    border border-neutral-gray-soft
                    text-base
                    text-neutral-black
                "
            >
                {comment}
            </p>
            <p 
                className={`
                    text-right 
                    text-sm
                    text-neutral-gray-light
                `}
            >
                {comment.length} / 150자
            </p>
        </article>
    );
}
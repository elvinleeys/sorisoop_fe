import { flexCol } from "@/mixin/style";
import { Button } from "soridam-design-system";

interface Props {
    onSave: () => void;
    onCancel: () => void;
}

export function SaveButtonGroup({ onSave, onCancel }: Props) {
    return (
        <div className={`${flexCol} gap-1 w-full items-center`}>
            <Button buttonType="primary" size="large" onClick={onSave}>
                측정 저장
            </Button>

            <Button buttonType="ghost" size="large" onClick={onCancel}>
                측정 취소
            </Button>
        </div>
    );
}

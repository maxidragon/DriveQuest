import { t } from "i18next";
import { useAtom } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import { categoryAtom } from "@/lib/atoms.ts";
import { AVAILABLE_CATEGORIES, PER_PAGE } from "@/lib/constants.ts";
import { Question } from "@/lib/interfaces.ts";
import { calculateAttempts, getQuestions } from "@/lib/questions.ts";
import { calculateTotalPages } from "@/lib/utils.ts";

const Questions = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useAtom(categoryAtom);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const [countAnswered, setCountAnswered] = useState<number>(0);
    const [search, setSearch] = useState<string>("");
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchData = async (
        categoryParam: string,
        pageParam: number,
        searchParam?: string
    ) => {
        const data = await getQuestions(pageParam, categoryParam, searchParam);
        setQuestions(data.questions);
        setCount(data.count);
        setCountAnswered(data.countAnswered);
        const totalPagesCalculation = calculateTotalPages(data.count, PER_PAGE);
        setTotalPages(totalPagesCalculation);
    };

    const handleCategoryChange = async (categoryParam: string) => {
        setCategory(categoryParam);
        localStorage.setItem("drive-quest-category", categoryParam);
        setPage(1);
        setSearch("");
        await fetchData(categoryParam, 1);
    };

    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
        const searchParam = event.target.value;
        setSearch(searchParam);
        setPage(1);
        await fetchData(category, 1, searchParam);
    };

    const handlePageChange = async (pageParam: number) => {
        setPage(pageParam);
        await fetchData(category, pageParam, search);
    };

    useEffect(() => {
        fetchData(category, page);
    }, [category, page]);

    return (
        <div className="flex flex-col">
            <div className="md:flex md:justify-between flex-col md:flex-row">
                <div className="flex gap-2 md:flex-row flex-col md:items-center justify-start">
                    <Input
                        placeholder={t("search")}
                        onChange={handleSearch}
                        value={search}
                    />
                    <Button
                        variant="default"
                        onClick={() => navigate(`/questions/random/`)}
                    >
                        {t("randomQuestion")}
                    </Button>
                </div>
                <div className="flex gap-2 md:flex-row flex-col md:items-center justify-start mt-2">
                    <Label>{t("category")}</Label>
                    <Select
                        value={category}
                        onValueChange={handleCategoryChange}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={t("category")} />
                        </SelectTrigger>
                        <SelectContent>
                            {AVAILABLE_CATEGORIES.map((availableCategory) => (
                                <SelectItem
                                    key={availableCategory}
                                    value={availableCategory}
                                >
                                    {availableCategory}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex gap-2 mt-2">
                {t("completedQuestions")} {countAnswered} / {count}
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t("question")}</TableHead>
                        <TableHead>{t("attempts")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {questions.map((question) => (
                        <TableRow
                            key={question.id}
                            onClick={() =>
                                navigate(`/questions/${question.id}`)
                            }
                            className="cursor-pointer"
                        >
                            <TableCell>{question.text}</TableCell>
                            <TableCell>
                                {calculateAttempts(question.answers)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-center items-center gap-2">
                <Button
                    variant="outline"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    {t("previous")}
                </Button>
                <p>
                    {page} {t("of")} {totalPages}
                </p>
                <Button
                    variant="outline"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    {t("next")}
                </Button>
            </div>
        </div>
    );
};

export default Questions;

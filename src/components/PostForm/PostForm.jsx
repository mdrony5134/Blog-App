import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwritService from "../../appwrite/conf";
import { Button, Input, Select, RTE } from "../index";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, getValues, setValue, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwritService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwritService.deleteFile(post.FeaturedImage);
      }
      const dbPost = await appwritService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwritService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.FeaturedImage = fileId;
        const dbCreatePost = await appwritService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbCreatePost) {
          navigate(`/post/${dbCreatePost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "Title") {
        setValue(
          "Slug",
          slugTransform(value.title, {
            shouldValidate: true,
          })
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title:"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label="Slug:"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.targe.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-3">
        <Input
          label="Featured Image:"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          className="mb-4"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwritService.getFilePreview(post.FeaturedImage)}
              alt={post.Title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status:"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          className="w-full"
          bgColor={post ? "bg-green-500" : undefined}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;

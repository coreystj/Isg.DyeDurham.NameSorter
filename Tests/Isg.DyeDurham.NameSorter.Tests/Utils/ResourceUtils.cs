/*
 * Summary: This utility class is used to process resource files.
 * 
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */

using Isg.DyeDurham.NameSorter.Tests.DataTypes;
using System.Reflection;
using System.Text;

namespace Isg.DyeDurham.NameSorter.Tests.Utils
{
    /// <summary>
    /// This utility class is used to process resource files.
    /// </summary>
    internal static class ResourceUtils
    {
        /// <summary>
        /// Retrieves the relative resource file path given the file resource type.
        /// </summary>
        /// <param name="resourceFileType">The file resource type used to get a path from.</param>
        /// <returns>Returns the file path.</returns>
        internal static string GetFilePath(ResourceFileType resourceFileType)
        {
            string basePath = AppDomain.CurrentDomain.BaseDirectory;
            string samplePath = Path.Combine("Resources", "Samples", $"{resourceFileType}.txt");
            string fullPath = Path.Combine(basePath, samplePath);

            return fullPath;
        }

        /// <summary>
        /// Reads the raw contents of a file given the resource file type.
        /// </summary>
        /// <param name="resourceFileType">The associated resource file type used to read the file.</param>
        /// <returns>Returns the raw content of the file.</returns>
        internal static string Read(ResourceFileType resourceFileType)
        {
            return Read(
                string.Join('.', "Resources", "Samples", resourceFileType.ToString(), "txt"));
        }

        /// <summary>
        /// Reads the resource content by resource name.
        /// </summary>
        /// <param name="resourceName">The resource name used to read the file contents.</param>
        /// <returns>Returns the file contents.</returns>
        private static string Read(string resourceName)
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            string resourcePath = $"{assembly.GetName().Name}.{resourceName}";

            resourcePath = resourcePath.Replace("\\", ".").Replace("/", ".");

            using Stream stream = assembly.GetManifestResourceStream(resourcePath);
            if (stream == null) return null;

            using StreamReader reader = new(stream, Encoding.UTF8);
            return reader.ReadToEnd();
        }
    }
}

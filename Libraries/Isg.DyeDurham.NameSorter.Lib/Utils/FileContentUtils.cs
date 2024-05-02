using Isg.DyeDurham.NameSorter.Lib.DataTypes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Isg.DyeDurham.NameSorter.Lib.Utils
{
    public static class FileContentUtils
    {
        public static bool TryReadLines(string rawContent, 
            out string[] lines, out Exception? resonException)
        {
			try
			{
                resonException = null;
                lines = rawContent.Split(
                    new[] { Constants.RETURN_STANDARD, "\n" }, StringSplitOptions.RemoveEmptyEntries);
                return lines != null;
            }
			catch (Exception ex)
			{
                resonException = ex;
                lines = new string[0];
                return false;
			}
        }

        /// <summary>
        /// Determines whether the rawContent is a binary file content.
        /// </summary>
        /// <param name="filePath">The file path to be checked.</param>
        /// <returns>Returns true if the contents are binary.</returns>
        public static bool CheckIsBinaryFile(string filePath)
        {
            using (FileStream fileStream = File.OpenRead(filePath))
            {
                // Define a buffer size for reading bytes from the file
                byte[] buffer = new byte[1024];

                // Read the first few bytes from the file
                int bytesRead = fileStream.Read(buffer, 0, buffer.Length);

                // Loop through the read bytes and check for non-textual characters
                for (int i = 0; i < bytesRead; i++)
                {
                    byte currentByte = buffer[i];

                    // Check if the byte value falls outside the range of ASCII printable characters
                    if ((currentByte < 32 || currentByte > 126) && currentByte != 9 && currentByte != 10 && currentByte != 13)
                    {
                        return true; // Non-textual byte found, indicating binary content
                    }
                }
            }

            return false; // No non-textual bytes found, indicating text content
        }
    }
}

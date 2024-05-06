/*
 * Summary: This model is used as a result from the name sorter engine class.
 * 
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */

using Isg.DyeDurham.NameSorter.Lib.DataTypes;
using Isg.DyeDurham.NameSorter.Lib.Utils;
using System.Linq;
using System.Text;

namespace Isg.DyeDurham.NameSorter.Lib.Models
{
    /// <summary>
    /// This model is used as a result from the name sorter engine class.
    /// </summary>
    public class NameSorterResult
    {
        /// <summary>
        /// The associated ordered names.
        /// </summary>
        public Name[] Names { get; private set; }

        /// <summary>
        /// Constructor with parameters.
        /// </summary>
        /// <param name="names">The associated names to be processed.</param>
        public NameSorterResult(string[] names)
        {
            Names = names.Select(x => NameUtils.Get(x)).ToArray();
        }

        /// <summary>
        /// Constructor with parameters.
        /// </summary>
        /// <param name="names">The resulting names after being processed.</param>
        public NameSorterResult(Name[] names) 
        {
            Names = names;
        }

        /// <summary>
        /// Generates a raw output for later file writing.
        /// </summary>
        /// <returns>Returns the raw names in a formatted schema.</returns>
        public string GenerateRaw()
        {
            return string.Join(Constants.RETURN_STANDARD, Names);
        }


        /// <summary>
        /// This equals override method is used to compare two results together.
        /// </summary>
        /// <param name="obj">The other result to be compared with.</param>
        /// <returns>Returns true if both results are equal.</returns>
        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }

            NameSorterResult other = (NameSorterResult)obj;

            if (Names.Length != other.Names.Length)
                return false;
            
            for (int i = 0; i < Names.Length; i++)
            {
                if (!Names[i].Equals(other.Names[i]))
                {
                    return false;
                }
            }

            return true;
        }

        /// <summary>
        /// This override method is used to convert this model to a readable string.
        /// </summary>
        /// <returns>Returns the names using a spaced delimiter.</returns>
        public override string ToString()
        {
            var stringBuilder = new StringBuilder();
            int index = 1;
            foreach (Name name in Names) {
                stringBuilder.Append($"\t{index++}) " + name + "\r\n");
            }
            return stringBuilder.ToString();
        }
    }
}
